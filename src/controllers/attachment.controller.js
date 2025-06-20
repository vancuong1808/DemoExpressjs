import AttachmentService from "../services/attachment.service.js";
class AttachmentController {

    constructor() {
        this.attachmentService = AttachmentService;
    }

     async singleUploadToLocal(req, res, netx) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ message: "No file uploaded" });
            }
            const result = await this.attachmentService.singleUploadToLocal(file);
            return res.status(201).json(result);
        } catch (error) {
            next( error.message("Error uploading files", error) );
        }
     }

    async multipleUploadToLocal(req, res, next) {
        try {
            const files = req.files;
            if (!files || files.length === 0) {
                return res.status(400).json({ message: "No files uploaded" });
            }
            const result = await this.attachmentService.multipleUploadToLocal(files);
            return res.status(201).json(result);
        } catch (error) {
            next( error.message("Error uploading files", error) );
        }
    }


     async singleUploadToCloud(req, res, netx) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ message: "No file uploaded" });
            }
            const result = await this.attachmentService.singleUploadToCloud(file);
            return res.status(201).json(result);
        } catch (error) {
            next( error.message("Error uploading files", error) );
        }
     }

    async multipleUploadToCloud(req, res, next) {
        try {
            const files = req.files;
            if (!files || files.length === 0) {
                return res.status(400).json({ message: "No files uploaded" });
            }
            const result = await this.attachmentService.multipleUploadToCloud(files);
            return res.status(201).json(result);
        } catch (error) {
            next( error.message("Error uploading files", error) );
        }
    }

    async getAll(req, res, next) {
        try {
            const attachments = await this.attachmentService.getAll();
            return res.status(200).json(attachments);
        } catch (error) {
            next( error.message("Error getting attachments", error) );
        }
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const attachment = await this.attachmentService.getById(id);
            if (!attachment) {
                return res.status(404).json({ message: "Attachment not found" });
            }
            return res.status(200).json(attachment);
        } catch (error) {
            next( error.message("Error getting attachment", error) );
        }
    }
}

export default new AttachmentController()
