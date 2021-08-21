import { logger } from '~/utils';
import { status } from '~/constants';
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

    const checkName = await TaskSchema.findOne({ fileName });
    if (checkName) {
      throw new Error('Task file with this name already exist');
    }

    file.mv(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
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
