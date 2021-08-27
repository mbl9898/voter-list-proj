import { logger } from '~/utils';
import { status } from '~/constants';
import { TaskSchema } from '~/schemas';
import fs from 'fs';

export const updateTask = async (req, res) => {
  const { OK, SERVER_ERROR } = status;
  try {
    const { email, title, description } = req.body;
    const file = req.files && req.files.file;
    const filePath = file && `./uploads/${file.name}`;
    const fileName = file && file.name;

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

    const taskToUpdate = await TaskSchema.findById({ _id: req.params.id });
    if (fileName) {
      fs.unlinkSync(taskToUpdate.filePath);
      file.mv(filePath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
      });
    }
    console.log(req.body);
    if (email) {
      taskToUpdate.email = email;
    }
    if (title) {
      taskToUpdate.title = title;
    }
    if (description) {
      taskToUpdate.description = description;
    }
    if (fileName) {
      taskToUpdate.fileName = fileName;
    }
    if (filePath) {
      taskToUpdate.filePath = filePath;
    }

    const data = await TaskSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ...taskToUpdate,
      },
      { new: true },
    );

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
