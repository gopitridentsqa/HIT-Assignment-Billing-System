export type TData = {
  clientName: string;
  rows: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  totalAmount: number;
  createdAt: Date;
};

const data: TData[] = [
  {
    clientName: 'Client 1',
    rows: [
      {
        description: '',
        quantity: 20,
        unitPrice: 5
      }
    ],
    totalAmount: 100,
    createdAt: new Date()
  },
  {
    clientName: 'Client 2',
    rows: [
      {
        description: '',
        quantity: 10,
        unitPrice: 50
      }
    ],
    totalAmount: 500,
    createdAt: new Date()
  },
  {
    clientName: 'Client 3',
    rows: [
      {
        description: '',
        quantity: 3,
        unitPrice: 10
      }
    ],
    totalAmount: 30,
    createdAt: new Date()
  }
];

export async function GET() {
  return Response.json(
    {
      success: true,
      message: 'Success',
      data
    },
    {
      status: 200
    }
  );
}

export async function POST(req: Request) {
  const { clientName, rows, totalAmount } = await req.json();

  if (!clientName) {
    return Response.json(
      {
        success: false,
        message: 'Missing required fields'
      },
      {
        status: 400
      }
    );
  }

  data.push({
    clientName,
    rows,
    totalAmount,
    createdAt: new Date()
  });

  return Response.json(
    {
      success: true,
      message: 'Success',
      data
    },
    {
      status: 200
    }
  );
}
