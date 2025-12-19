# Background Music Setup

## Adding Background Music

To add your own background music:

1. **Place your music file** in this directory (`public/music/`)
2. **Name it** `background.mp3` (or update the path in `MusicController.tsx`)
3. **Recommended format**: MP3, OGG, or M4A
4. **Recommended length**: 2-5 minutes (will loop automatically)

## Music Suggestions

For a Solo Leveling / cyber theme, consider:
- Epic orchestral with electronic elements
- Cyberpunk/synthwave tracks
- Motivational workout music
- Sci-fi ambient with beats

## Free Music Sources

- **YouTube Audio Library**: Free, no attribution required
- **Incompetech**: Royalty-free music by Kevin MacLeod
- **Bensound**: Free music with attribution
- **Freesound**: Creative Commons audio

## Example

```
public/
  music/
    background.mp3  ← Your music file here
```

The music will automatically loop and play after the first user interaction (due to browser autoplay policies).

