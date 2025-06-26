import ArenaMap from './ArenaMap';
import BottomMenu from './BottomMenu';

const ArenaRenderer: React.FC = () => {
    return (
        <div className='w-screen h-screen overflow-hidden bg-black relative'>
            <ArenaMap />
            <BottomMenu />
        </div>
    )
}

export default ArenaRenderer
