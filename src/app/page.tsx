import { PageHeader } from '@/components/page-header';
import { PlaceRecommendation } from '@/components/place-recommendation';

export default function Home() {
  return (
    <>
      <PageHeader
        title="AI Recommendations"
        description="Let our AI find the perfect spots for you based on your preferences."
      />
      <div className="mt-8">
        <PlaceRecommendation />
      </div>
    </>
  );
}
