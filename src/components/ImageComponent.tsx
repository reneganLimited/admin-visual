/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Storage } from "aws-amplify";
import { pdfjs, Document, Page } from "react-pdf";
import heic2any from "heic2any";
import filetype from "magic-bytes.js";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IProps {
  objectKey: any;
  objectDate?: any;
}

function ImageComponent({ objectKey, objectDate }: IProps) {
  const [fileUrl, setFileUrl] = useState<string | null>("");
  const [userFileType, setFileType] = useState<string | null>(null);
  const [arrayBuffer, setarrayBuffer] = useState<ArrayBuffer | any>();
  const [fileError, setFileError] = useState(false);
  const [pdfWidth, setPdfWidth] = useState(600);
  const [pdfHeight, setPdfHeight] = useState(600);
  const [loading, setLoader] = useState(true);
  const [numPages, setNumPages] = useState(null);

  const handlePageLoadSuccess = (page: {
    getViewport: (arg0: { scale: number }) => any;
  }) => {
    setPdfWidth(600);
    setPdfHeight(600);
  };

  const onError = (err: any) => {
    console.error("Error loading PDF:", err);
  };


  const onDocumentLoadSuccess = (res: any) => {
    setNumPages(res.numPages);
    console.log("PDF loaded successfully:", res);
  };

  const getImageUrl = async () => {
    try {
      const url = await Storage.get(objectKey, { level: "public" });
      const response = await fetch(url);
      const blob = await response.blob();
      convertImageToBase64(blob);
      const mimeInfo = await getFileTypeUsingMagicBytes(blob);
      setFileType(mimeInfo?.ext);
      if (!mimeInfo?.ext) {
        setFileType("image");
      } else if (
        mimeInfo?.ext.includes("heic") ||
        mimeInfo?.ext.includes("heif")
      ) {
        convertHEICToJPG(blob);
      } else if (mimeInfo?.ext.includes("pdf")) {
        setFileUrl(url);
      } else {
        convertOctetToJPG(blob);
      }
      setLoader(false)
      const subUrl = url?.substring(0, 100);
      console.log(subUrl, userFileType);
    } catch (error) {
      setFileError(true);
      console.error("Error fetching image URL:", error);
    }
  };

  const getFileTypeUsingMagicBytes = async (blob: Blob) => {
    return new Promise<{ ext: any }>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onloadend = () => {
        if (reader.result instanceof ArrayBuffer) {
          const arrayBuffer = reader.result;
          const uint8Array = new Uint8Array(arrayBuffer);
          const type = filetype(uint8Array);
          resolve({ ext: type[0]?.mime });
        }
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };
    });
  };

  const convertOctetToJPG = async (blob: Blob) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        const jpegBlob = new Blob([uint8Array], { type: "image/jpeg" });
        const jpegUrl = URL.createObjectURL(jpegBlob);
        setFileUrl(jpegUrl);
      }
    };
  };

  const convertHEICToJPG = async (blob: any) => {
    const conversionResult = await heic2any({ blob });
    if (conversionResult instanceof Blob) {
      const jpegUrl = URL.createObjectURL(conversionResult);
      setFileUrl(jpegUrl);
    } else if (Array.isArray(conversionResult)) {
      const jpegUrls = conversionResult.map((blob, index) => {
        const jpegUrl = URL.createObjectURL(blob);
        return jpegUrl;
      });
      setFileUrl(jpegUrls[0]);
    }
  };

  const convertImageToBase64 = async (blob: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      setFileUrl(arrayBuffer?.toString()!);
      setarrayBuffer(arrayBuffer!);
    };
  };

  useEffect(() => {
    setLoader(true);
    getImageUrl();
  }, [objectKey]);
  return (
    <div
      className="rounded-md mb-8 float-left w-full"
      style={{ border: "1px solid black" }}
    >
      <h4 className="padding">
        Uploaded &nbsp;
        {objectDate &&
          new Date(objectDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        &nbsp; &nbsp; (<b>{userFileType || "..."}</b>)
      </h4>

        {loading && "Please wait..."}
        {!loading && !fileUrl && "no data"}
        {!loading && fileUrl ? (
        <>
          {userFileType?.includes("pdf") && (
              <div className="mt-2" style={{ width: "100%" }}>
              <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onError={(error) => console.error("Failed to load document:", error)}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    scale={1}
                    pageNumber={index + 1}
                    width={pdfWidth}
                    height={pdfHeight}
                    className={"pdf-display"}
                    onLoadSuccess={handlePageLoadSuccess}
                  />
                ))}
              </Document>
            </div>
          )}

          {userFileType?.includes("video") && (
            <video
              src={fileUrl!}
              style={{ width: "570px", margin: "auto", backgroundSize: "fit" }}
            />
          )}

          {userFileType?.includes("image") && (
            <img
              src={fileUrl!}
              alt="S3 Object"
              style={{ width: "100%", margin: "auto", backgroundSize: "fit" }}
            />
          )}
        </>
      ) : (
        <div className="w-full padding text-center">
          {fileError ? (
            <p className="padding text-center">Oops, don't recognize file</p>
          ) : (
            <p className="padding text-center">Loading file...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageComponent;
