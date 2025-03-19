"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Dumbbell, Clock, Calendar, Check, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types
type FitnessGoal = "strength" | "endurance" | "weight-loss" | "muscle-gain" | "flexibility"
type FitnessLevel = "beginner" | "intermediate" | "advanced"
type Equipment = "none" | "minimal" | "full-gym"
type WorkoutDay = {
  day: string
  exercises: Exercise[]
  completed?: boolean
}
type Exercise = {
  name: string
  sets?: number
  reps?: number
  duration?: number
  restTime?: number
  completed?: boolean
}

export function WorkoutGenerator() {
  // State
  const [step, setStep] = useState(1)
  const [fitnessGoal, setFitnessGoal] = useState<FitnessGoal>("strength")
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel>("beginner")
  const [equipment, setEquipment] = useState<Equipment>("minimal")
  const [daysPerWeek, setDaysPerWeek] = useState(3)
  const [timePerWorkout, setTimePerWorkout] = useState(30)
  const [focusAreas, setFocusAreas] = useState<string[]>([])
  const [injuries, setInjuries] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>([])

  // Handle focus area selection
  const handleFocusAreaChange = (area: string) => {
    setFocusAreas((prev) => (prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]))
  }

  // Generate workout plan
  const generateWorkoutPlan = () => {
    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      // Mock workout plan based on user selections
      const mockPlan: WorkoutDay[] = []

      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      const selectedDays = days.slice(0, daysPerWeek)

      // Generate exercises based on fitness goal and level
      const strengthExercises = [
        { name: "Bench Press", sets: 3, reps: 8, restTime: 90 },
        { name: "Squats", sets: 3, reps: 10, restTime: 90 },
        { name: "Deadlifts", sets: 3, reps: 6, restTime: 120 },
        { name: "Shoulder Press", sets: 3, reps: 8, restTime: 90 },
        { name: "Pull-ups", sets: 3, reps: 8, restTime: 90 },
        { name: "Barbell Rows", sets: 3, reps: 8, restTime: 90 },
      ]

      const enduranceExercises = [
        { name: "Running", duration: 20, restTime: 60 },
        { name: "Cycling", duration: 15, restTime: 60 },
        { name: "Jump Rope", duration: 10, restTime: 60 },
        { name: "Burpees", sets: 3, reps: 15, restTime: 60 },
        { name: "Mountain Climbers", duration: 5, restTime: 30 },
        { name: "High Knees", duration: 5, restTime: 30 },
      ]

      const weightLossExercises = [
        { name: "HIIT Circuit", duration: 15, restTime: 60 },
        { name: "Jumping Jacks", duration: 5, restTime: 30 },
        { name: "Burpees", sets: 3, reps: 15, restTime: 45 },
        { name: "Mountain Climbers", duration: 5, restTime: 30 },
        { name: "Kettlebell Swings", sets: 3, reps: 15, restTime: 45 },
        { name: "Box Jumps", sets: 3, reps: 12, restTime: 45 },
      ]

      const muscleGainExercises = [
        { name: "Bench Press", sets: 4, reps: 8, restTime: 90 },
        { name: "Squats", sets: 4, reps: 8, restTime: 90 },
        { name: "Deadlifts", sets: 4, reps: 6, restTime: 120 },
        { name: "Shoulder Press", sets: 4, reps: 8, restTime: 90 },
        { name: "Bicep Curls", sets: 3, reps: 12, restTime: 60 },
        { name: "Tricep Extensions", sets: 3, reps: 12, restTime: 60 },
      ]

      const flexibilityExercises = [
        { name: "Yoga Flow", duration: 15, restTime: 30 },
        { name: "Dynamic Stretching", duration: 10, restTime: 30 },
        { name: "Hamstring Stretch", duration: 5, restTime: 30 },
        { name: "Hip Flexor Stretch", duration: 5, restTime: 30 },
        { name: "Shoulder Mobility", duration: 5, restTime: 30 },
        { name: "Spine Mobility", duration: 5, restTime: 30 },
      ]

      // Select exercises based on goal
      let exercisePool: Exercise[] = []
      switch (fitnessGoal) {
        case "strength":
          exercisePool = strengthExercises
          break
        case "endurance":
          exercisePool = enduranceExercises
          break
        case "weight-loss":
          exercisePool = weightLossExercises
          break
        case "muscle-gain":
          exercisePool = muscleGainExercises
          break
        case "flexibility":
          exercisePool = flexibilityExercises
          break
      }

      // Adjust exercise difficulty based on fitness level
      if (fitnessLevel === "beginner") {
        exercisePool = exercisePool.map((ex) => ({
          ...ex,
          sets: ex.sets ? Math.max(2, ex.sets - 1) : undefined,
          reps: ex.reps ? Math.max(6, ex.reps - 2) : undefined,
          duration: ex.duration ? Math.max(5, ex.duration - 5) : undefined,
          restTime: ex.restTime ? ex.restTime + 30 : undefined,
        }))
      } else if (fitnessLevel === "advanced") {
        exercisePool = exercisePool.map((ex) => ({
          ...ex,
          sets: ex.sets ? ex.sets + 1 : undefined,
          reps: ex.reps ? ex.reps + 2 : undefined,
          duration: ex.duration ? ex.duration + 5 : undefined,
          restTime: ex.restTime ? Math.max(30, ex.restTime - 15) : undefined,
        }))
      }

      // Create workout days
      selectedDays.forEach((day) => {
        // Shuffle exercise pool and take a subset
        const shuffled = [...exercisePool].sort(() => 0.5 - Math.random())
        const dayExercises = shuffled.slice(0, 4) // 4 exercises per day

        mockPlan.push({
          day,
          exercises: dayExercises,
        })
      })

      setWorkoutPlan(mockPlan)
      setIsGenerating(false)
      setStep(3)
    }, 2000)
  }

  // Mark exercise as completed
  const toggleExerciseCompletion = (dayIndex: number, exerciseIndex: number) => {
    setWorkoutPlan((prev) => {
      const newPlan = [...prev]
      const exercise = newPlan[dayIndex].exercises[exerciseIndex]
      exercise.completed = !exercise.completed

      // Check if all exercises in the day are completed
      const allCompleted = newPlan[dayIndex].exercises.every((ex) => ex.completed)
      newPlan[dayIndex].completed = allCompleted

      return newPlan
    })
  }

  // Format time display
  const formatTime = (minutes?: number) => {
    if (!minutes) return ""
    if (minutes < 60) return `${minutes} min`
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hrs}h ${mins > 0 ? `${mins}m` : ""}`
  }

  // Get goal icon
  const getGoalIcon = (goal: FitnessGoal) => {
    switch (goal) {
      case "strength":
        return "💪"
      case "endurance":
        return "🏃"
      case "weight-loss":
        return "⚖️"
      case "muscle-gain":
        return "🏋️"
      case "flexibility":
        return "🧘"
    }
  }

  // Get goal color
  const getGoalColor = (goal: FitnessGoal) => {
    switch (goal) {
      case "strength":
        return "from-red-600 to-red-800"
      case "endurance":
        return "from-blue-600 to-blue-800"
      case "weight-loss":
        return "from-green-600 to-green-800"
      case "muscle-gain":
        return "from-purple-600 to-purple-800"
      case "flexibility":
        return "from-yellow-600 to-yellow-800"
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step 1: Basic Information */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Create Your Training Regimen
            </h2>
            <p className="text-gray-300">
              Tell us about your goals and preferences to generate a personalized workout plan
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">What's your main fitness goal?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(["strength", "endurance", "weight-loss", "muscle-gain", "flexibility"] as FitnessGoal[]).map(
                  (goal) => (
                    <button
                      key={goal}
                      className={`p-4 rounded-xl border transition-all ${
                        fitnessGoal === goal
                          ? `bg-gradient-to-br ${getGoalColor(goal)} border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.5)]`
                          : "bg-gray-800/50 border-gray-700 hover:border-purple-500/50"
                      }`}
                      onClick={() => setFitnessGoal(goal)}
                    >
                      <div className="text-3xl mb-2">{getGoalIcon(goal)}</div>
                      <div className="font-bold capitalize">{goal.replace("-", " ")}</div>
                    </button>
                  ),
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">What's your current fitness level?</h3>
              <RadioGroup
                value={fitnessLevel}
                onValueChange={(value) => setFitnessLevel(value as FitnessLevel)}
                className="flex flex-col md:flex-row gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="cursor-pointer">
                    Beginner
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="cursor-pointer">
                    Intermediate
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="cursor-pointer">
                    Advanced
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">What equipment do you have access to?</h3>
              <Select value={equipment} onValueChange={(value) => setEquipment(value as Equipment)}>
                <SelectTrigger className="w-full md:w-1/2">
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Equipment (Bodyweight Only)</SelectItem>
                  <SelectItem value="minimal">Minimal Equipment (Dumbbells, Resistance Bands)</SelectItem>
                  <SelectItem value="full-gym">Full Gym Access</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 rounded-lg text-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.8)] transition-all duration-300"
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 2: Detailed Preferences */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Fine-tune Your Training
            </h2>
            <p className="text-gray-300">Let's customize your workout plan to fit your schedule and preferences</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">How many days per week can you train?</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Days per week: {daysPerWeek}</span>
                </div>
                <Slider
                  value={[daysPerWeek]}
                  min={1}
                  max={7}
                  step={1}
                  onValueChange={(value) => setDaysPerWeek(value[0])}
                  className="w-full md:w-2/3"
                />
                <div className="flex justify-between w-full md:w-2/3 text-sm text-gray-400">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">How much time can you spend per workout?</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Minutes per workout: {timePerWorkout}</span>
                </div>
                <Slider
                  value={[timePerWorkout]}
                  min={15}
                  max={120}
                  step={5}
                  onValueChange={(value) => setTimePerWorkout(value[0])}
                  className="w-full md:w-2/3"
                />
                <div className="flex justify-between w-full md:w-2/3 text-sm text-gray-400">
                  <span>15m</span>
                  <span>30m</span>
                  <span>45m</span>
                  <span>60m</span>
                  <span>75m</span>
                  <span>90m</span>
                  <span>120m</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Which areas would you like to focus on?</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Arms", "Chest", "Back", "Shoulders", "Legs", "Core", "Cardio", "Full Body"].map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area.toLowerCase()}
                      checked={focusAreas.includes(area)}
                      onCheckedChange={() => handleFocusAreaChange(area)}
                    />
                    <Label htmlFor={area.toLowerCase()} className="cursor-pointer">
                      {area}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Do you have any injuries or limitations?</h3>
              <Input
                placeholder="E.g., knee injury, lower back pain, etc."
                value={injuries}
                onChange={(e) => setInjuries(e.target.value)}
                className="w-full md:w-2/3"
              />
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              >
                Back
              </Button>

              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 rounded-lg text-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.8)] transition-all duration-300"
                onClick={generateWorkoutPlan}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Plan <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 3: Workout Plan */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Your Personalized Training Regimen
            </h2>
            <p className="text-gray-300">Follow this plan to achieve your {fitnessGoal.replace("-", " ")} goals</p>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <div className="bg-gray-800/50 rounded-full px-4 py-1 text-sm flex items-center">
                <Dumbbell className="h-4 w-4 mr-1 text-purple-400" />
                <span className="capitalize">{fitnessLevel}</span>
              </div>

              <div className="bg-gray-800/50 rounded-full px-4 py-1 text-sm flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-purple-400" />
                <span>{daysPerWeek} days/week</span>
              </div>

              <div className="bg-gray-800/50 rounded-full px-4 py-1 text-sm flex items-center">
                <Clock className="h-4 w-4 mr-1 text-purple-400" />
                <span>~{timePerWorkout} min/workout</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue={workoutPlan[0]?.day.toLowerCase()}>
            <TabsList className="w-full flex overflow-x-auto scrollbar-thin scrollbar-thumb-purple-900/50 scrollbar-track-transparent">
              {workoutPlan.map((day) => (
                <TabsTrigger key={day.day} value={day.day.toLowerCase()} className="flex-1 min-w-[100px] relative">
                  {day.day}
                  {day.completed && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {workoutPlan.map((day, dayIndex) => (
              <TabsContent key={day.day} value={day.day.toLowerCase()} className="mt-6">
                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      {day.day}'s Workout
                    </span>
                    {day.completed && (
                      <span className="ml-2 text-sm bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                        Completed
                      </span>
                    )}
                  </h3>

                  <div className="space-y-4">
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <div
                        key={exerciseIndex}
                        className={`p-4 rounded-lg border ${
                          exercise.completed
                            ? "bg-green-900/10 border-green-500/30"
                            : "bg-gray-800/30 border-gray-700/30 hover:border-purple-500/30"
                        } transition-colors`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-lg">{exercise.name}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 w-8 rounded-full ${
                              exercise.completed
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                : "bg-gray-700/30 text-gray-300 hover:bg-gray-700/50"
                            }`}
                            onClick={() => toggleExerciseCompletion(dayIndex, exerciseIndex)}
                          >
                            {exercise.completed ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                          </Button>
                        </div>

                        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-300">
                          {exercise.sets && (
                            <div className="bg-gray-800/50 rounded px-2 py-1">Sets: {exercise.sets}</div>
                          )}

                          {exercise.reps && (
                            <div className="bg-gray-800/50 rounded px-2 py-1">Reps: {exercise.reps}</div>
                          )}

                          {exercise.duration && (
                            <div className="bg-gray-800/50 rounded px-2 py-1">Duration: {exercise.duration} min</div>
                          )}

                          {exercise.restTime && (
                            <div className="bg-gray-800/50 rounded px-2 py-1">Rest: {exercise.restTime} sec</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(2)}
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            >
              Adjust Plan
            </Button>

            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 rounded-lg text-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.8)] transition-all duration-300"
            >
              Save Plan
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

