import { Star } from "lucide-react";

type Testimonial = {
  quote: string;
  author: string;
  source: string;
};

interface TestimonialsCarouselProps {
  testimonials: readonly Testimonial[];
}

function TestimonialCard({ testimonial }: Readonly<{ testimonial: Testimonial }>) {
  return (
    <blockquote className="testimonial-card">
      <div className="stars" aria-label="5 estrelas">
        {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={18} fill="currentColor" />)}
      </div>
      <p>“{testimonial.quote}”</p>
      <footer><strong>{testimonial.author}</strong><span>{testimonial.source}</span></footer>
    </blockquote>
  );
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  return (
    <div
      className="testimonials-carousel"
      role="region"
      aria-label="Avaliações de clientes no Google. A animação pausa ao passar o mouse ou usar o teclado."
      tabIndex={0}
      data-reveal="fade"
    >
      <div className="testimonials-track">
        <div className="testimonials-group">
          {testimonials.map((testimonial) => <TestimonialCard key={testimonial.author} testimonial={testimonial} />)}
        </div>
        <div className="testimonials-group" aria-hidden="true">
          {testimonials.map((testimonial) => <TestimonialCard key={`duplicate-${testimonial.author}`} testimonial={testimonial} />)}
        </div>
      </div>
    </div>
  );
}
