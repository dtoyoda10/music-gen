# <p align="center"> AI Music Generator</p>

<p align="center">AI music production uses the services of Suno.ai and Udio.com to create high-quality music works, and also provides the functions of generating lyrics and videos.</p>



## Interface Preview
According to the description of the input song, combined with the selected model, high-quality music works can be produced.

The function of generating lyrics is provided. To generate videos, the Suno model needs to be selected.


## Project Features
### Create a Song
Enter the description of the song in the input box on the creation page. You can choose whether it's pure music or not. After clicking the creation button, the generated music will be fully displayed in the play list.
### Customization Mode
You can customize the lyrics, style and title. The AI will generate a piece of music according to your lyrics.
### Lyric Generation
You can randomly generate lyrics or enter some words before generating lyrics. The AI will generate lyrics by associating with the keywords you input.
### Video Generation
The Suno model can generate not only audio but also video.
### Dark Mode
It supports dark mode to protect your eyes.
### Multi-language Support
- Japanese Interface
- English Interface
- Chinese Interface

## Future Update Plans
- [ ] A new sound effect function has been added
- [ ] A new history record function has been added, allowing users to import music from the history records for creation


## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Radix UI
- **State Management**: Jotai
- **Form Handling**: React Hook Form
- **HTTP Client**: ky
- **i18n**: next-intl
- **Theming**: next-themes
- **Code Standards**: ESLint, Prettier
- **Commit Standards**: Husky, Commitlint

## Development & Deployment
1. Clone the project
```bash
git clone https://github.com/dtoyoda10/music-gen
cd music-gen
```

2. Install dependencies
```bash
pnpm install
```

3. Configure environment
```bash
cp .env.example .env.local
```
Modify the environment variables in `.env.local` as needed.

4. Start development server
```bash
pnpm dev
```

5. Build for production
```bash
pnpm build
pnpm start
```