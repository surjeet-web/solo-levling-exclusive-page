import { Calendar, Award, Dumbbell, Users } from "lucide-react"

export const featureData = [
  {
    title: "Implement Event",
    description:
      "Create and join virtual fitness events that challenge you to push your limits. Compete with others worldwide and earn exclusive rewards for your achievements.",
    icon: <Calendar className="h-8 w-8" />,
    image: "/placeholder.svg?height=600&width=800",
    color: "#6366F1", // Indigo
  },
  {
    title: "Achievement System",
    description:
      "Track your progress with an extensive achievement system that rewards consistency and milestone accomplishments. Unlock badges and titles as you advance in your fitness journey.",
    icon: <Award className="h-8 w-8" />,
    image: "/placeholder.svg?height=600&width=800",
    color: "#8B5CF6", // Purple
  },
  {
    title: "Workout Plan",
    description:
      "Access personalized workout plans tailored to your fitness level and goals. Our AI-powered system adapts as you progress, ensuring optimal results and continuous improvement.",
    icon: <Dumbbell className="h-8 w-8" />,
    image: "/placeholder.svg?height=600&width=800",
    color: "#EC4899", // Pink
  },
  {
    title: "Social Community",
    description:
      "Connect with like-minded fitness enthusiasts in our vibrant community. Share your achievements, get inspired by others, and join groups focused on specific fitness disciplines.",
    icon: <Users className="h-8 w-8" />,
    image: "/placeholder.svg?height=600&width=800",
    color: "#3B82F6", // Blue
  },
]

