import autoAnimate from "@formkit/auto-animate"
import { addDoc, collection, doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import React, { useEffect, useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import useSWRImmutable from "swr/immutable"

import FormElementRender from "@/components/form-element/form-element"
import Layout from "@/components/layout/layout"
import Spinner from "@/components/spinner/spinner"
import { db } from "@/firebase/firebase.config"
import isVisible from "@/services/isVisible"
import { FormObject } from "@/types/form.types"

interface FormDocument {
  id: string
  formObject: FormObject
}

export default function Home() {
  const form = useForm()
  const { handleSubmit, getValues, watch } = form
  const parent = useRef(null)
  const router = useRouter()
  const id = router.query.id as string

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const { data, isLoading } = useSWRImmutable(
    ["forms", id],
    async () => {
      const docRef = doc(db, "forms", id)

      const snap = await getDoc(docRef)

      return snap.data() as FormDocument
    },
    { revalidateOnMount: true }
  )

  watch()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)

    try {
      const submissions = collection(db, "submissions")

      await addDoc(submissions, { data, id })
      router.push("/")
    } catch (e) {
      console.log("error", e)
    }
  })

  return (
    <Layout title={data && data.formObject.title}>
      <>
        {!isLoading && data ? (
          <FormProvider {...form}>
            <form
              ref={parent}
              onSubmit={onSubmit}
              className="mb-6 mt-20 flex w-full max-w-[1024px] flex-col gap-2 px-4"
            >
              {data.formObject.elements
                .filter((element) => isVisible(element, getValues))
                .map((element) => (
                  <FormElementRender key={element.key} element={element} />
                ))}
              <button className="rounded bg-pink-500 px-3 py-1.5 text-white hover:bg-pink-600 sm:col-span-2">
                Submit
              </button>
            </form>
          </FormProvider>
        ) : (
          <Spinner />
        )}
      </>
    </Layout>
  )
}
