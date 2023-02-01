import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { api } from "../lib/axios";


const availableWeekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

export function New() {

  const [ title, setTitle ] = useState('')
  const [ weekDays, setWeekDays ] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim()) {
        Alert.alert("Novo hábito", "Informe o nome do hábito")
        return
      }
      if (weekDays.length === 0) {
        Alert.alert("Novo hábito", "Escolha a periodicidade")
        return
      }
      await api.post("/habits", {
        title, weekDays
      })
      setTitle('')
      setWeekDays([])
      Alert.alert("Novo hábito", "Hábito salvo com sucesso!")
    } catch (error) {
      Alert.alert("Ops!", "Não foi possível criar o hábito")
      console.log(JSON.stringify(error, null, 1))
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual o seu comprometimento?
        </Text>

        <TextInput 
          className="h-12 pl-4 rounded-lg mt-3 text-white bg-zinc-900 border-2 border-zinc-800 focus:border-green-600"
          placeholder="ex: Exercício, dormir bem, etc"
          placeholderTextColor={colors.zinc[400]}
          value={title}
          onChangeText={setTitle}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>
        
        {availableWeekDays.map((weekDay, i) => (
          <Checkbox 
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(i)}
            onPress={() => handleToggleWeekDay(i)}
           />
        ))}

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
        >
          <Feather 
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="text-white font-semibold text-base ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}