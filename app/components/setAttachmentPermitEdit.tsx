// export const setPermitsAttachEdit = async (
//   setNotify: any,
//   gUser: any,
//   permit: any,
//   moduleId: Number,
//   moduleKey: string,
//   files: Array<any>,
//   callComplete = () => {}
// ) => {
//   try {
//     let apiData;
//     const filesWithImageId = files?.filter((file) => file?.image_id);
//     if (filesWithImageId?.length > 0) {
//       // apiData = getApiDefaultParams({
//       //   user: gUser,
//       //   otherParams: {
//       //     attach_image: filesWithImageId
//       //       ?.map((file) => file?.image_id)
//       //       ?.join(","),
//       //     module_id: moduleId,
//       //     module_key: moduleKey,
//       //     primary_id: permit?.permit_id,
//       //     project_id: permit?.project_id,
//       //   },
//       // });
//     } else {
//       // const imageIdsStr = files?.map((file: any) => file?.image_id)?.join(",");

//       let tempFiles: any[] = [];
//       let i = 0;

//       // Use a for...of loop to iterate over the files array
//       await Promise.all(
//         files.map(async (obj) => {
//           i++;

//           let tempObj: any = {
//             file_url: obj.file_path,
//             is_image: 0,
//             notes: "",
//             is_file_shared: 0,
//             attach_item_id: 0,
//           };

//           if (Number(obj.is_image) === 1 || obj.is_image) {
//             async function addImageProcess(src: string) {
//               let img = new Image();
//               return new Promise((resolve, reject) => {
//                 img.onload = () => resolve(img.width + "x" + img.height);
//                 img.onerror = reject;
//                 img.src = src;
//               });
//             }

//             try {
//               const [imageRes, cameraRes] = await Promise.all([
//                 addImageProcess(obj.file_path),
//                 addImageProcess(obj.file_path),
//               ]);

//               tempObj = {
//                 ...tempObj,
//                 is_image: 1,
//                 image_res: imageRes as string,
//                 camera_res: cameraRes as string,
//               };
//             } catch (error) {
//               // Handle errors for individual file processing
//               console.error("Error processing file:", error);
//             }
//           } else if (Number(obj.is_image) === 0) {
//             tempObj = {
//               ...tempObj,
//               is_image: 0,
//             };
//           }

//           tempFiles.push(tempObj);
//         })
//       );
//       apiData = getApiDefaultParams({
//         user: gUser,
//         otherParams: {
//           module_id: moduleId,
//           module_key: moduleKey,
//           aws_files_url: tempFiles,
//           primary_id: permit?.permit_id,
//           project_id: permit?.project_id,
//           // attach_image: !isEmpty(imageIdsStr) ? imageIdsStr : undefined,
//           file_tags: "photo",
//           file_type: "png",
//           notes: "Test",
//           title: "Testing Add",
//           chld_item_name: "",
//           file_save_from_email: 0,
//           is_common_notes: 0,
//           is_file_shared: 0,
//           is_already_save: 0,
//           directory_type: 1,
//           add_to_sub_folder: 1,
//           is_google_drive_file: 0,
//           companycam_webhook_id: 1,
//           companycam_photo_id: 0,
//           companycam_creator_name: 0,
//           called_from: 0,
//           client_cover_image: 0,
//         },
//       });
//     }

//     getApiData({
//       url: apiRoutes.FILE_ADD.url,
//       method: "post",
//       data: apiData,
//       success: (response: {
//         success: number;
//         message: string;
//         aws_files: TPermitAwsFiles[];
//       }) => {
//         if (Int(response?.success) === 0) {
//           setNotify({
//             title: "Alert",
//             type: "danger",
//             message: response?.message ?? "Please select file.",
//           } as Notify);
//         }
//       },
//       error: setNotify,
//       callComplete: callComplete,
//     });
//   } catch (error: unknown) {
//     console.error("zustand manage Project api", error);
//   }
// };
