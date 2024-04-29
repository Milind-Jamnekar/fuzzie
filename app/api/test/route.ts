export async function GET() {
  return Response.json(process.env.VERCEL_URL);
}
