import PhotoCarousel from '../components/PhotoCarousel';
import MusicCard from '../components/MusicCard';
import CoordinateLabel from '../components/CoordinateLabel';
import HairlineRule from '../components/HairlineRule';
import creativeData from '../../content/creative.json';

interface MusicTrack {
  title: string;
  artist: string;
  platform: 'soundcloud' | 'spotify';
  url: string;
  cover: string;
  duration: string;
  genre: string;
}

export default function Creative() {
  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      <div className="px-6 sm:px-12 lg:px-20 xl:px-28 pt-32 pb-24">
        <CoordinateLabel className="block mb-4">{'[ 03 ] CREATIVE'}</CoordinateLabel>
        <h1 className="text-[40px] sm:text-[64px] lg:text-[88px] font-display font-bold leading-[0.95] tracking-tight max-w-4xl mb-20">
          Creative
        </h1>

        {/* Photography Section */}
        <section className="mb-24">
          <CoordinateLabel className="block mb-2">{'[ A ] PHOTOGRAPHY'}</CoordinateLabel>
          <h2 className="text-[28px] sm:text-[40px] font-display font-bold leading-[1.05] mb-4">{creativeData.photography.title}</h2>
          <p className="text-lg text-brand-text-secondary leading-relaxed max-w-xl mb-12">
            {creativeData.photography.description}
          </p>

          <PhotoCarousel photos={creativeData.photography.photos} />
        </section>

        <HairlineRule className="mb-24" />

        {/* Music Section */}
        <section>
          <CoordinateLabel className="block mb-2">{'[ B ] LISTENING'}</CoordinateLabel>
          <h2 className="text-[28px] sm:text-[40px] font-display font-bold leading-[1.05] mb-4">{creativeData.music.title}</h2>
          <p className="text-lg text-brand-text-secondary leading-relaxed max-w-xl mb-12">
            {creativeData.music.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creativeData.music.tracks.map((track, index) => (
              <MusicCard key={index} track={track as MusicTrack} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
