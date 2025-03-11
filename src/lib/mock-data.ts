
import { TranscriptionResult } from "@/components/transcription-display";

export const mockTranscription: TranscriptionResult = {
  id: "tr_123456789",
  filename: "interview-recording.mp3",
  duration: 125.4,
  createdAt: new Date().toISOString(),
  text: "Welcome to this interview. Today we're going to discuss the future of AI and its impact on society. As we've seen in recent years, artificial intelligence has made tremendous strides in various fields including healthcare, transportation, and education.\n\nOne of the most exciting developments has been in natural language processing, which has enabled systems like advanced transcription services that can accurately convert speech to text in real-time. These technologies are making content more accessible and helping businesses streamline their workflows.\n\nWhat do you think will be the next major breakthrough in AI technology?",
  segments: [
    {
      id: 1,
      start: 0,
      end: 8.2,
      text: "Welcome to this interview. Today we're going to discuss the future of AI and its impact on society."
    },
    {
      id: 2,
      start: 8.2,
      end: 23.6,
      text: "As we've seen in recent years, artificial intelligence has made tremendous strides in various fields including healthcare, transportation, and education."
    },
    {
      id: 3,
      start: 24.1,
      end: 42.8,
      text: "One of the most exciting developments has been in natural language processing, which has enabled systems like advanced transcription services that can accurately convert speech to text in real-time."
    },
    {
      id: 4,
      start: 43.2,
      end: 56.5,
      text: "These technologies are making content more accessible and helping businesses streamline their workflows."
    },
    {
      id: 5,
      start: 57.0,
      end: 65.4,
      text: "What do you think will be the next major breakthrough in AI technology?"
    }
  ]
};
