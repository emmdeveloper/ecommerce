import React from "react";

const page = () => {
  return (
    <main>
      <section className="section">
        <h1 className="text-lg mb-3 font-semibold text-center pt-3">
          Add Product
        </h1>
        <form>
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
          <button type="submit" className="btn btn-primary btn-block">
            Add Product
          </button>
        </form>
      </section>
    </main>
  );
};

export default page;
