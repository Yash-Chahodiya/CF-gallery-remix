// // import axios from "axios";

// // export const fileUploadApi = async ({
// //   gConfig,
// //   file,
// //   fetchAwsUrlError,
// //   onUploadProgress,
// //   fileUploadSuccess,
// // }: any) => {
// //   try {
// //     const uploadResponse = await axios.post(
// //       "https://api3-beta.contractorforeman.net/api/upload",
// //       {
// //         userId: 109871,
// //         companyId: 829,
// //         fileName: file?.name,
// //         thumb: file?.type?.startsWith("image/") ? true : false,
// //         fileType: file?.type,
// //         moduleName: "project_permits",
// //       },
// //       {
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization:
// //             "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImhhcnNoaWwuc2FraGl5YSs4NTQ1QHdlZW5nZ3MuaW4iLCJ1c2VyX2lkIjoxMDk4NzEsImNvbXBhbnlfaWQiOjgyOSwiZW1haWwiOiJoYXJzaGlsLnNha2hpeWErODU0NUB3ZWVuZ2dzLmluIiwiZnVsbE5hbWUiOiJoYXJzaGlsIHRlc3QiLCJyb2xlX2lkIjo5MjQ4NCwiY2ZfdG9rZW4iOiIkMmEkMTIkZTAzMDQ4ZmQxZTI0NmYwNGRiNWJlZTQ5NzV6enE0UkpadTlCT2JRSE9keklpZnJEL0piLzZfMF8wIn0.hlkooYTtEgZ0gIkWx1_4FcqYfStlfQ6kfiaA0KHLRkg",
// //         },
// //       }
// //     );

// //     const responseData = uploadResponse.data;

// //     if (!responseData.success) {
// //       fetchAwsUrlError?.(responseData.message || "Unknown error during upload");
// //       return;
// //     }

// //     const signedUrl = responseData.data.signedUrl;

// //     if (!signedUrl) {
// //       fetchAwsUrlError?.("Failed to get signed URL");
// //       return;
// //     }

// //     const headers = {
// //       "Content-Type": file.type || "application/octet-stream",
// //       "Content-Length": file.size.toString(),
// //     };

// //     const uploadConfig = {
// //       headers,
// //       onUploadProgress: (progressEvent: any) => {
// //         onUploadProgress?.(
// //           Math.round((100 * progressEvent.loaded) / (progressEvent.total || 1))
// //         );
// //       },
// //     };

// //     await axios.put(signedUrl, file, uploadConfig);

// //     // Assuming successful upload here
// //     if (fileUploadSuccess) {
// //       fileUploadSuccess(signedUrl);
// //     }
// //   } catch (error) {
// //     fetchAwsUrlError?.("Unknown error during upload");
// //   }
// // };

// import axios from "axios";

// export const fileUploadApi = async ({
//   gConfig,
//   file,
//   fetchAwsUrlError,
//   onUploadProgress,
//   fileUploadSuccess,
// }: any) => {
//   try {
//     // Make a POST request to get the signed URL
//     const uploadResponse = await axios.post(
//       "https://api3-beta.contractorforeman.net/api/upload",
//       {
//         userId: 109871,
//         companyId: 829,
//         fileName: file?.name,
//         thumb: file?.type?.startsWith("image/") ? true : false,
//         fileType: file?.type,
//         moduleName: "project_permits",
//       },
//       {
//         headers: {
//           Authorization:
//             "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImhhcnNoaWwuc2FraGl5YSs4NTQ1QHdlZW5nZ3MuaW4iLCJ1c2VyX2lkIjoxMDk4NzEsImNvbXBhbnlfaWQiOjgyOSwiZW1haWwiOiJoYXJzaGlsLnNha2hpeWErODU0NUB3ZWVuZ2dzLmluIiwiZnVsbE5hbWUiOiJoYXJzaGlsIHRlc3QiLCJyb2xlX2lkIjo5MjQ4NCwiY2ZfdG9rZW4iOiIkMmEkMTIkZTAzMDQ4ZmQxZTI0NmYwNGRiNWJlZTQ5NzV6enE0UkpadTlCT2JRSE9keklpZnJEL0piLzZfMF8wIn0.hlkooYTtEgZ0gIkWx1_4FcqYfStlfQ6kfiaA0KHLRkg",
//         },
//       }
//     );

//     const responseData = uploadResponse.data;

//     if (!responseData.success) {
//       fetchAwsUrlError?.(responseData.message || "Unknown error during upload");
//       return;
//     }

//     const signedUrl = responseData.data.signedUrl;

//     if (!signedUrl) {
//       fetchAwsUrlError?.("Failed to get signed URL");
//       return;
//     }

//     // Prepare headers for the PUT request
//     const headers = {
//       "Content-Type": file.type || "application/octet-stream",
//       "Content-Length": file.size.toString(),
//       Authorization:
//         "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImhhcnNoaWwuc2FraGl5YSs4NTQ1QHdlZW5nZ3MuaW4iLCJ1c2VyX2lkIjoxMDk4NzEsImNvbXBhbnlfaWQiOjgyOSwiZW1haWwiOiJoYXJzaGlsLnNha2hpeWErODU0NUB3ZWVuZ2dzLmluIiwiZnVsbE5hbWUiOiJoYXJzaGlsIHRlc3QiLCJyb2xlX2lkIjo5MjQ4NCwiY2ZfdG9rZW4iOiIkMmEkMTIkZTAzMDQ4ZmQxZTI0NmYwNGRiNWJlZTQ5NzV6enE0UkpadTlCT2JRSE9keklpZnJEL0piLzZfMF8wIn0.hlkooYTtEgZ0gIkWx1_4FcqYfStlfQ6kfiaA0KHLRkg",
//     };

//     const uploadConfig = {
//       onUploadProgress: (progressEvent: any) => {
//         onUploadProgress?.(
//           Math.round((100 * progressEvent.loaded) / (progressEvent.total || 1))
//         );
//       },
//     };

//     // Make a PUT request to upload the file to the signed URL
//     await axios.put(signedUrl, file, uploadConfig);

//     // Assuming successful upload here
//     if (fileUploadSuccess) {
//       fileUploadSuccess(signedUrl);
//     }
//   } catch (error) {
//     fetchAwsUrlError?.("Unknown error during upload");
//   }
// };

import axios, { AxiosProgressEvent, AxiosResponse } from "axios";

export const fileUploadApi = async ({
  file,
  fetchAwsUrlError,
  onUploadProgress,
  fileUploadSuccess,
}: any) => {
  try {
    // Make a POST request to get the signed URL
    const postResponse = await axios.post(
      "https://api3-beta.contractorforeman.net/api/upload",
      {
        userId: 109871,
        companyId: 829,
        fileName: file?.name,
        thumb: file?.type?.startsWith("image/") ? true : false,
        fileType: file?.type,
        moduleName: "project_permits",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImhhcnNoaWwuc2FraGl5YSs4NTQ1QHdlZW5nZ3MuaW4iLCJ1c2VyX2lkIjoxMDk4NzEsImNvbXBhbnlfaWQiOjgyOSwiZW1haWwiOiJoYXJzaGlsLnNha2hpeWErODU0NUB3ZWVuZ2dzLmluIiwiZnVsbE5hbWUiOiJoYXJzaGlsIHRlc3QiLCJyb2xlX2lkIjo5MjQ4NCwiY2ZfdG9rZW4iOiIkMmEkMTIkZTAzMDQ4ZmQxZTI0NmYwNGRiNWJlZTQ5NzV6enE0UkpadTlCT2JRSE9keklpZnJEL0piLzZfMF8wIn0.hlkooYTtEgZ0gIkWx1_4FcqYfStlfQ6kfiaA0KHLRkg",
        },
      }
    );

    const responseData = postResponse.data;

    if (!responseData.success || !responseData.data.signedUrl) {
      fetchAwsUrlError?.(responseData.message || "Failed to get signed URL");
      return;
    }

    const signedUrl = responseData.data.signedUrl;

    // Prepare headers and configuration for the PUT request
    const headers = {
      "Content-Type": file.type || "application/octet-stream",
      "Content-Length": file.size.toString(),
    };

    const uploadConfig = {
      headers,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        onUploadProgress?.(
          Math.round((100 * progressEvent.loaded) / (progressEvent.total || 1))
        );
      },
    };

    // Make a PUT request to upload the file to the signed URL
    const putResponse = await axios.put(signedUrl, file, uploadConfig);

    // Assuming successful upload here
    if (putResponse.status === 200) {
      const fileUrl = new URL(signedUrl);
      fileUploadSuccess?.(fileUrl.origin + fileUrl.pathname);
    } else {
      fetchAwsUrlError?.("Failed to upload file");
    }
  } catch (error) {
    fetchAwsUrlError?.("Unknown error during upload");
  }
};
