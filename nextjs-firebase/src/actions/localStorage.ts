"use client"

export const setInLocalStorage = (key: string, value: any) => {
  if (value === undefined) return
  return localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = (key: string) => {
  const itemInStorage = localStorage.getItem(key)
  if (!itemInStorage || itemInStorage === "undefined") return undefined
  return JSON.parse(itemInStorage)
}