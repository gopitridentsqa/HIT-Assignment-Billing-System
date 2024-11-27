export type TData = {
  clientName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  createdAt: Date;
};

const data: TData[] = [
  {
    clientName: "Client 1",
    description: "Description 1",
    quantity: 2,
    unitPrice: 10,
    createdAt: new Date(),
  },
  {
    clientName: "Client 2",
    description: "Description 2",
    quantity: 3,
    unitPrice: 15,
    createdAt: new Date(),
  },
  {
    clientName: "Client 3",
    description: "Description 3",
    quantity: 1,
    unitPrice: 8,
    createdAt: new Date(),
  },
];

export async function GET() {
  return Response.json(
    {
      success: true,
      message: "Success",
      data,
    },
    {
      status: 200,
    }
  );
}

export async function POST(req: Request) {
  const { clientName, description, quantity, unitPrice } = await req.json();

  if (!clientName || !description || !quantity || !unitPrice) {
    return Response.json(
      {
        success: false,
        message: "Missing required fields",
      },
      {
        status: 400,
      }
    );
  }

  data.push({
    clientName,
    description,
    quantity,
    unitPrice,
    createdAt: new Date(),
  });

  return Response.json(
    {
      success: true,
      message: "Success",
      data,
    },
    {
      status: 200,
    }
  );
}
