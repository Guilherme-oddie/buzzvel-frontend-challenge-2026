import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { peoplePhotosMock } from '@/mocks/people';
import { ImageCollage, type ImageCollagePhotos } from '.';

describe('ImageCollage', () => {
  it('renders the ten photo slots and decorative background', () => {
    const { asFragment } = render(<ImageCollage photos={peoplePhotosMock} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts photo content, crop position and native props', () => {
    const [firstPhoto, ...otherPhotos] = peoplePhotosMock;
    const photos: ImageCollagePhotos = [
      { ...firstPhoto, src: '/portrait.jpg', alt: 'Custom portrait', objectPosition: '25% 50%' },
      ...otherPhotos,
    ];
    const { getByRole } = render(
      <ImageCollage
        photos={photos}
        id="portraits"
        aria-label="Portraits"
        className="custom-collage"
      />,
    );

    expect(getByRole('group', { name: 'Portraits' })).toHaveAttribute('id', 'portraits');
    expect(getByRole('group', { name: 'Portraits' })).toHaveClass('custom-collage');
    expect(getByRole('img', { name: 'Custom portrait' })).toMatchSnapshot();
  });
});
