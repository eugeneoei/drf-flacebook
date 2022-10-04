const SUPPORTED_FILE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const isFileImageType = file => SUPPORTED_FILE_FORMATS.includes(file.type)

export {
    isFileImageType
}