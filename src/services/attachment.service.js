import Attachment from "../models/attachment.model.js";

class AttachmentService {
    constructor() {
        this.attachment = Attachment;
    }

    async singleUploadToLocal(file) {
        try {
            if (!file) {
                throw new Error("No file uploaded");
            }
            const newAttachment = await this.attachment.create({
                filename: file.originalname,
                path: file.path,
            });
            return newAttachment;
        } catch (error) {
            throw new Error("Error uploading files", error);
        }
    }

    async multipleUploadToLocal(files) {
        try {
            const attachments = files.map(file => ({
                filename: file.originalname,
                path: file.path,
            }));
            if (!attachments || attachments.length === 0) {
                throw new Error("No attachments uploaded");
            }
            const newAttachments = await this.attachment.insertMany(attachments);
            return newAttachments;
        } catch (error) {
            throw new Error("Error uploading files", error);
        }
    }

    async getAll() {
        try {
            const attachments = await this.attachment.find();
            return attachments;
        } catch (error) {
            throw new Error("Error getting attachments", error);
        }
    }

    async singleUploadToCloud(file) {
        try {
            if (!file) {
                throw new Error("No file uploaded");
            }
            const newAttachment = await this.attachment.create({
                filename: file.originalname,
                path: file.path,
                cloudinaryId: file.filename
            });
            return newAttachment;
        } catch (error) {
            throw new Error("Error uploading files", error);
        }
    }

    async multipleUploadToCloud(files) {
        try {
            const attachments = files.map(file => ({
                filename: file.originalname,
                path: file.path,
                cloudinaryId: file.filename
            }));
            if (!attachments || attachments.length === 0) {
                throw new Error("No attachments uploaded");
            }
            const newAttachments = await this.attachment.insertMany(attachments);
            return newAttachments;
        } catch (error) {
            throw new Error("Error uploading files", error);
        }
    }

    async getById(id) {
        try {
            const attachment = await this.attachment.findById(id);
            if (!attachment) {
                throw new Error("Attachment not found");
            }
            return attachment;
        } catch (error) {
            throw new Error("Error getting attachment", error);
        }
    }
}

export default new AttachmentService();
