import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton from "@/components/FormSubmitButton";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/db/options";

export const metadata = {
  title: "Add Product - MegStorm",
};

async function AddProduct(FormData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = FormData.get("name")?.toString();
  const description = FormData.get("description")?.toString();
  const imageUrl = FormData.get("imageUrl")?.toString();
  const price = Number(FormData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }
  return (
    <main>
      <section className="section">
        <h1 className="text-lg mb-3 font-semibold text-center pt-3">
          Add Product
        </h1>
        <form action={AddProduct}>
          <div>
            <input
              required
              name="name"
              placeholder="Product Name:"
              className="input input-bordered mb-3  w-full"
            />
          </div>
          <textarea
            className="textarea w-full textarea-bordered mb-3"
            placeholder="Product Description:"
            required
            name="description"
          ></textarea>
          <div>
            <input
              required
              name="imageUrl"
              type="url"
              placeholder="Product Image URL"
              className="input input-bordered mb-3 w-full"
            />
          </div>
          <div>
            <input
              required
              name="price"
              placeholder="Product price:"
              type="number"
              className="input input-bordered mb-3 w-full"
            />
          </div>
          <FormSubmitButton className="btn-block" type="submit">
            Add Product
          </FormSubmitButton>
        </form>
      </section>
    </main>
  );
};

export default page;
