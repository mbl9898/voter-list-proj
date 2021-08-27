import { logger } from '~/utils';
import { status } from '~/constants';
import path from 'path';
import { TaskSchema } from 'schemas/Task';

export const createTask = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    const user = req.user;
    const file = req.files.file;
    const filePath = `./uploads/${file.name}`;
    const fileName = file.name;

    if (
      file.mimetype !== 'application/pdf' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpeg'
    ) {
      const error = new Error('Invalid File Type');
      console.log(error);
      return res.json({ success: false, message: 'Invalid File Type' });
    }

    const checkName = await TaskSchema.findOne({ fileName });
    if (checkName) {
      const error = new Error('Task file with this name already exist');
      console.log(error);
      return res.json({
        success: false,
        message: 'Task file with this name already exist',
      });
    }
    file.mv(filePath, async (err) => {
      if (err) {
        console.error(err);
        return res.json({
          success: false,
          error: err,
          message: 'no such file or directory',
        });
      }
    });

    const data = new TaskSchema({
      email: req.body.email,
      title: req.body.title,
      description: req.body.description,
      fileName: file.name,
      filePath: filePath,
      enteredBy: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
      createdAt: new Date().toISOString(),
    });

    await data.save();

    return res.json({
      success: true,
      data,
    });
  } catch (e) {
    logger('error', 'Error:', e.message);
    return res.json({
      status: SERVER_ERROR,
      success: false,
      message: 'Internal Server Error',
    });
  }
};
