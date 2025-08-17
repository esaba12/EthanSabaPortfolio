import PhotoCarousel from '../components/PhotoCarousel';
import MusicCard from '../components/MusicCard';
import creativeData from '../../content/creative.json';

export default function Creative() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="container mx-auto px-8 py-16">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Photography Section */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{creativeData.photography.title}</h2>
              <p className="text-lg text-brand-text-secondary max-w-3xl mx-auto leading-relaxed">
                {creativeData.photography.description}
              </p>
            </div>
            
            <PhotoCarousel photos={creativeData.photography.photos} />
          </section>

          {/* Music Section */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{creativeData.music.title}</h2>
              <p className="text-lg text-brand-text-secondary max-w-3xl mx-auto leading-relaxed">
                {creativeData.music.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {creativeData.music.tracks.map((track, index) => (
                <MusicCard key={index} track={track} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
