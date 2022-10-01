from base64 import b64encode

from app.settings import IMAGEKIT_PRIVATE_KEY, IMAGEKIT_PUBLIC_KEY, IMAGEKIT_URL_ENDPOINT
from imagekitio import ImageKit

imagekit = ImageKit(
    private_key=IMAGEKIT_PRIVATE_KEY,
    public_key=IMAGEKIT_PUBLIC_KEY,
    url_endpoint=IMAGEKIT_URL_ENDPOINT
)


def upload_file(file, file_name):
    file_type = file.content_type.split("/")[1]
    file_name = f"{file_name}.{file_type}"
    response = imagekit.upload_file(
        file=b64encode(file.read()).decode("utf-8"),
        file_name=file_name
    )

    if response.get("error"):
        print("Upload file error", response.get("error"))
        return None
    else:
        return {
            "url": response["response"]["url"],
            "id": response["response"]["fileId"]
        }


def delete_file(file_id):
    response = imagekit.delete_file(file_id)
    if response.get("error"):
        print("Delete file error", response.get("error"))
    return
