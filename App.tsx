import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, "Required Length is 4")
    .required("Length is Required")
})

export default function App() {
  const [password, setPassword] = useState('')
  const [isPasswordGenereted, setIsPasswordGenerated] = useState(false)
  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, useNumbers] = useState(false)
  const [symbols, useSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let charchterList = ''
    const upperCaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChar = 'abcdefghijklmnopqrstuvwxyz'
    const digit = '0123456789'
    const specialChar = '!@#$%^&*()-+'
    if (lowerCase) {
      charchterList += lowerCaseChar
    }
    if (upperCase) {
      charchterList += upperCaseChar
    }
    if (numbers) {
      charchterList += digit
    }
    if (symbols) {
      charchterList += specialChar
    }
    const passwordResult = createPassword(charchterList, passwordLength)
    setPassword(passwordResult)
    setIsPasswordGenerated(true)

  }
  const createPassword = (charachters: string, passwordLength: number) => {

    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * charachters.length)
      result += charachters.charAt(charIndex)

    }
    return result
  }
  const resetPasswordState = () => {
    setPassword('')
    setIsPasswordGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    useNumbers(false)
    useSymbols(false)

  }

  return (
    <ScrollView style ={styles.container} keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}> PasswordGenerator </Text>

          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values)
              generatePasswordString(+values.passwordLength)//Todo
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength &&
                      (
                        <Text style={styles.errorText}>
                          {errors.passwordLength}
                        </Text>
                      )
                    }

                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder='EX . 8'
                    placeholderTextColor={'#000000'}
                    keyboardType='numeric'>


                  </TextInput>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}> Include Lower Case</Text>
                  <View>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#29AB87"
                  />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  
                <Text style={styles.heading}> Include UpperCase Case</Text>
                <View>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#FFAB87"
                  />
                    </View>

                  
                </View>
                <View style={styles.inputWrapper}>
                  
                <Text style={styles.heading}> Include Number</Text>
                <View>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={numbers}
                    onPress={() => useNumbers(!numbers)}
                    fillColor="#290087"
                  />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  
                <Text style={styles.heading}> Include symbols</Text>
                <View>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={symbols}
                    onPress={() => useSymbols(!symbols)}
                    fillColor="#29AB00"
                  
                    />    
                    </View>           

                </View>

                <View style={styles.formActions}>

                  <TouchableOpacity 
                  disabled ={!isValid}
                  style ={styles.primaryBtn}
                  onPress={()=>{
                    handleSubmit()}}
                  >
                    <Text style ={styles.primaryBtnTxt}>  Genrate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style ={styles.secondaryBtn}
                     onPress={()=>{
                      handleReset()}}>
                    <Text style ={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>)}
          </Formik>
        </View>
        {isPasswordGenereted ? (
          <View style ={ [styles.card,styles.cardElevated]}>
            <Text style ={styles.subTitle}>Result:</Text>
            <Text style ={styles.description}>Long Press to copy </Text>
            <Text style ={styles.generatedPassword} selectable = {true}>{password}</Text>

          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container :{
    backgroundColor:'#FFFFFF'
  },
  appContainer: {
    flex: 1,
    backgroundColor :'#FFFFFF'
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e'
  
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
})