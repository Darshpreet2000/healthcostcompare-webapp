import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Hospital name is required" }, { status: 400 });
  }

  const googleImagesUrl = `https://www.google.com/search?q=${encodeURIComponent(name + " hospital")}&tbm=isch`;

  try {
    const response = await fetch(googleImagesUrl, {
    //   headers: {
    //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    //   },
    });
    console.log("Google Images response status:", response);
    if (!response.ok) {
      // Attempt to read error response if available
      const errorText = await response.text();
      console.error(`Failed to fetch images: ${response.status} - ${errorText}`);
      return NextResponse.json({ error: `Failed to fetch images from Google: ${response.statusText}` }, { status: response.status });
    }

    const html = await response.text();
    console.log("Fetched HTML length:", html);
    // console.log("Fetched HTML:", html);
    // Attempt to extract the first image URL using regex
    // This is a very basic and fragile approach, prone to breaking with Google's HTML changes
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    let imageUrl = "";
    let imgCount = 0;

    while ((match = regex.exec(html)) !== null && imgCount < 5) { // Look for first few images
        console.log(`Found image URL: ${match[1]}`);
      // Filter out common non-content images (e.g., Google logos, transparent pixels)
      if (match[1] && !match[1].includes("google.com/images/branding/") && !match[1].includes("gstatic.com/images/icons/")) {
        if (match[1].startsWith("http")) { // Ensure it's a full URL
          imageUrl = match[1];
          break; // Found a suitable image
        }
      }
      imgCount++;
    }

    if (imageUrl) {
      return NextResponse.json({ imageUrl });
    } else {
      return NextResponse.json({ error: "No suitable image found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error("Error fetching hospital image:", error);
    return NextResponse.json({ error: `Server error: ${error.message}` }, { status: 500 });
  }
}
