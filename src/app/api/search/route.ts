import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_BASE_URL = 'https://healthcostcompare.vercel.app';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const externalApiResponse = await fetch(`${EXTERNAL_API_BASE_URL}/search?query=${query}`);

    if (!externalApiResponse.ok) {
      const errorText = await externalApiResponse.text();
      console.error(`External API error: ${externalApiResponse.status} - ${errorText}`);
      return NextResponse.json(
        { error: `Failed to fetch data from external API: ${externalApiResponse.statusText}` },
        { status: externalApiResponse.status }
      );
    }

    const data = await externalApiResponse.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error during proxy request', details: error.message },
      { status: 500 }
    );
  }
}
