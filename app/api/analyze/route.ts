export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Request body:', body);

    const backendUrl = 'https://carely-zjex.onrender.com/api/analyze-solar';
    console.log('Calling backend:', backendUrl);

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    console.log('Backend response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Backend response:', data);
    
    return Response.json(data);
  } catch (error) {
    console.error('Backend API error:', error);
    return Response.json(
      { 
        error: 'Failed to analyze call',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
