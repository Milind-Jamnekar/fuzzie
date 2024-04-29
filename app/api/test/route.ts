export async function GET() {
  if (process.env.VERCEL_URL) {
    return Response.json(process.env.VERCEL_URL);
  } else {
    return Response.json(new URL("https://fuzzie.milindjamnekar.dev"));
  }
}
