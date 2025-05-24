interface SkeletonLoaderProps {
  type?: 'image' | 'video';
  className?: string;
}

export default function SkeletonLoader({ type = 'image', className = '' }: SkeletonLoaderProps) {
  return (
    <div className={`skeleton-loader ${type === 'video' ? 'video-skeleton' : 'image-skeleton'} ${className}`}>
      {/* Wave animation handled by ::after pseudo-element in CSS */}
    </div>
  );
}
