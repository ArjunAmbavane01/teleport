import { getUserOrRedirect } from '@/lib/auth/getUserOrRedirect'
import { getArenaIdFromSlug, getInitialChatMessages } from '@/actions/arenaActions';
import { createWsToken } from '@workspace/common/utils/jwt';
import ArenaWrapper from './_components/ArenaWrapper';
import { prisma } from '@workspace/db';
import { ChatMessagesMap } from '@/features/arena/types';

interface PageProps { params: Promise<{ slug: string }> }

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const user = await getUserOrRedirect();
  const { slug } = await params;
  const arenaId = (await getArenaIdFromSlug(slug))?.id;
  if (!arenaId) return <div>Arena not found</div>
  const wsToken = await createWsToken(user.id as string, arenaId);
  if (!wsToken) return <div>Some Internal Error Occurred</div>

  const initialChatMessages = await getInitialChatMessages(user);
  
  return <ArenaWrapper wsToken={wsToken} userId={user.id as string} initialChatMessages={initialChatMessages} />
}

export default Page;
