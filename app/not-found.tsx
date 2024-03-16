import Link from "next/dist/client/link";
export default function NotFound() {
  return (
    <section className="section">
      <div className="flex items-center justify-center flex-col gap-4 mt-10">
        <h2 className="font-bold text-2xl">Page not Found</h2>
        <Link href={"/"}>
          <button className="btn">Return Home</button>
        </Link>
      </div>
    </section>
  );
}
