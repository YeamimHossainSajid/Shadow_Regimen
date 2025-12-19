# Profile Image Setup

## Adding Solo Leveling Character Image

To add Sung Jin-Woo's profile picture:

1. **Find or create an image** of Sung Jin-Woo (Solo Leveling main character)
   - Recommended size: 400x400px or larger (square)
   - Format: PNG with transparent background preferred
   - The image will be cropped to a circle

2. **Save the image** as `solo-leveling-character.png` in the `public` folder

3. **Alternative locations** (if you prefer):
   - `public/images/solo-leveling-character.png`
   - `src/assets/solo-leveling-character.png` (then update the import in Profile.tsx)

4. **If no image is provided**, the component will show a fallback design with a sword icon and "SHADOW MONARCH" text.

## Current Implementation

The Profile component looks for the image at:
- `/solo-leveling-character.png` (public folder)

The image will be:
- Displayed in a circular frame (200x200px)
- Bordered with cyan glow effect
- Has a rank badge overlay in the bottom-right corner

