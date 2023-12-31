import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  CategoryImageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload Category Image complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
    ProductImageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload Product Image complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
    BannerImageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload Banner Image complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
    SupplierLogoUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload Supplier Logo complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
    StoreLogoUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload Supplier Logo complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
    TrainingThumbnailUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload Training Thumbnail complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;