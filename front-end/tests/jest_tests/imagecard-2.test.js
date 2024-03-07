import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageCard from '../../src/app/about/components/ImageCard.js';

// Unit test ImageCard component
describe('ImageCard Component', () => {
  const imageProps = {
    src: 'https://seeklogo.com/images/A/aws-amplify-logo-D68DDB5AB1-seeklogo.com.png',
    alt: 'Image 2',
    textBelowImage: 'Amplify'
  };

  it('renders ImageCard component with correct props', () => {
    render(<ImageCard {...imageProps} />);

    // Assert that the image is rendered with the correct src and alt attributes
    const imageElement = screen.getByAltText('Image 2');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', imageProps.src);

    // Assert that the text below the image is rendered
    expect(screen.getByText('Amplify')).toBeInTheDocument();
  });
});