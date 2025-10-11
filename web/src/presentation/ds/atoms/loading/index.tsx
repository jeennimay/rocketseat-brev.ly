import { AssetsImg } from '@ds/index';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-dvh w-dvw">
      <img
        src={AssetsImg.LogoIcon}
        alt="Brevly Logo"
        className="w-20 h-20 animate-pulse"
      />
    </div>
  );
};

export default Loading;
