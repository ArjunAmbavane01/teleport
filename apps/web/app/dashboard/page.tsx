import prisma from "@workspace/db/client";

const Page: React.FC = async () => {
    const res = await prisma.user.findMany({ where: {} });
    console.log(res);
    return (
        <div>
            Dashboard
        </div>
    )
}

export default Page;
