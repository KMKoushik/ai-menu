'use client'

import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { useState } from 'react'
import Select from 'react-select/creatable'
import makeAnimated from 'react-select/animated';
import { IoLogoGithub } from "react-icons/io5";


async function fetchData(cuisine: string, ingredients: string, instruction?: string) {
  // getMenu
  //mockGetMenu
  const res = await fetch(`/api/getMenu?cuisine=${cuisine}&ingredients=${ingredients}&instruction=${instruction}`)

  const { data } = await res.json() as { data: string }
  return data.split('\n').filter(itr => itr !== '')
}

const cuisines = [
  { label: 'Italian', value: 'italian' },
  { label: 'Mexican', value: 'mexican' },
  { label: 'French', value: 'french' },
  { label: 'Chinese', value: 'chinese' },
  { label: 'Japanese', value: 'japanese' },
  { label: 'Thai', value: 'thai' },
  { label: 'Indian', value: 'indian' },
  { label: 'Greek', value: 'greek' },
  { label: 'Spanish', value: 'spanish' },
  { label: 'Vietnamese', value: 'vietnamese' },
  { label: 'Lebanese', value: 'lebanese' },
  { label: 'Moroccan', value: 'moroccan' },
  { label: 'Turkish', value: 'turkish' },
  { label: 'Korean', value: 'korean' },
  { label: 'American', value: 'american' },
  { label: 'Caribbean', value: 'caribbean' },
  { label: 'Brazilian', value: 'brazilian' },
  { label: 'Ethiopian', value: 'ethiopian' },
  { label: 'Russian', value: 'russian' },
  { label: 'German', value: 'german' }];


const ingredients = [{ label: 'eg: Potato', value: 'potato' }]

const animatedComponents = makeAnimated();


export default function Home() {
  const [menu, setMenu] = useState<Array<string>>([])
  const [loading, setLoading] = useState(false)
  const [selectedCuisine, setSelectedCuisine] = useState<Array<{ label: string, value: string }>>([])
  const [selectedIngredients, setSelectedIngredients] = useState<Array<{ label: string, value: string }>>([])
  const [instruction, setInstruction] = useState('')

  const getMenu = () => {
    setLoading(true)
    console.log(selectedCuisine.map(c => c.value).join(','))
    fetchData(selectedCuisine.map(c => c.value).join(','), selectedIngredients.map(c => c.value).join(','), instruction)
      .then(data => {
        setMenu(data)
      })
      .finally(() => setLoading(false))
  }

  return (
    <main className="h-full p-5 bg-black text-white">
      <div className="flex justify-center">
        <div className="max-w-4xl w-full">
          <div className="py-5 flex justify-between border-gray-800 border-b">
            <div>
              <h2 className="text-2xl">🍜 AI Menu</h2>
            </div>
            <div>
              <a target="_blank" href="https://github.com/KMKoushik/ai-menu" rel="noreferrer" className="flex items-center border p-2 rounded-3xl border-gray-500 text-sm hover:bg-gray-800">
                <IoLogoGithub className="mr-2" /> Star on github
              </a>
            </div>
          </div>
          <h1 className="text-3xl text-center mt-12 text-gray-300">Get suggestion on what to eat/cook powered by openAI</h1>
          <div className="mt-10 w-full">
            <p className="mb-2">What cuisine you have in mind?</p>
            <Select
              closeMenuOnSelect={false}
              options={cuisines}
              components={animatedComponents}
              isMulti
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'rgba(0,0,0)',
                  color: 'rgb(255 255 255)',
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'rgb(17 24 39)',
                  color: 'rgb(255 255 255)',
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isFocused ? 'rgb(31 41 55)' : 'rgb(17 24 39)',
                }),
                multiValue: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'rgb(31 41 55)',
                  color: 'rgb(255 255 255)',
                }),
                multiValueLabel: (baseStyles, state) => ({
                  ...baseStyles,
                  color: 'rgb(255 255 255)',
                }),
                input: (baseStyles, state) => ({
                  ...baseStyles,
                  color: 'rgb(255 255 255)',
                }),
              }}
              onChange={(e) => { setSelectedCuisine(e as Array<{ label: string, value: string }>) }}
              placeholder="Add cuisines"
              instanceId="cuisines"
            />
          </div>
          <div className="mt-10">
            <p className="mb-2">Add some ingredients that&apos;s available</p>
            <Select
              closeMenuOnSelect={false}
              options={ingredients}
              components={animatedComponents}
              isMulti
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'rgba(0,0,0)',
                  color: 'rgb(255 255 255)',
                  width: '100%',
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'rgb(17 24 39)',
                  color: 'rgb(255 255 255)',
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isFocused ? 'rgb(31 41 55)' : 'rgb(17 24 39)',
                }),
                multiValue: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'rgb(31 41 55)',
                  color: 'rgb(255 255 255)',
                }),
                multiValueLabel: (baseStyles, state) => ({
                  ...baseStyles,
                  color: 'rgb(255 255 255)',
                }),
                input: (baseStyles, state) => ({
                  ...baseStyles,
                  color: 'rgb(255 255 255)',
                }),
              }}
              onChange={(e) => { setSelectedIngredients(e as Array<{ label: string, value: string }>) }}
              placeholder="Add Ingredients"
              instanceId="ingredients"
            />
          </div>

          <div className="mt-10">
            <p className="mb-2">Any other instruction</p>
            <textarea
              onChange={(e) => setInstruction(e.target.value)}
              className="w-full rounded-md bg-black border border-gray-400 p-2"
              placeholder="Ex. Make it gluten free"
            />
          </div>

          <div className="flex justify-center mt-10 text-gray-900">
            <button className="bg-gradient-to-r from-cyan-400 to-blue-400 p-2 rounded-md px-4 " disabled={loading} onClick={() => getMenu()}>
              Get menu
            </button>
          </div>
          <div className=" min-h-fit">
            {loading ? (
              <div className="mt-4 flex justify-center">Loading...</div>
            ) : (

              <div>
                {menu.map(itr =>
                  <MenuItem menu={itr} key={itr} />
                )}
              </div>
            )
            }
          </div>
          <div>
            <p className="text-center mt-10 text-gray-400 text-lg pb-5">
              Made with <span className="text-gray-300">Open AI, NextJs</span> and ❤️ by <a className="text-cyan-400" target="_blank" href="https://twitter.com/KM_Koushik_" rel="noreferrer">Koushik</a>
            </p>
          </div>
        </div>
      </div>
    </main >
  )
}


const MenuItem: React.FC<{ menu: string }> = ({ menu }) => {
  const itemData = menu.split(':')

  return (
    <div className="p-4 rounded-md bg-gray-800 mt-4">
      <p className="text-xl mt-2 text-gray-100 ">{itemData[0]} : <span className="text-gray-300">{itemData[1]}</span></p>
    </div>
  )
}