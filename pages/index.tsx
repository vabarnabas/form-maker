import autoAnimate from "@formkit/auto-animate"
import { collection, getDocs, limit, query } from "firebase/firestore"
import { useRouter } from "next/router"
import React, { useEffect, useRef } from "react"
import useSWR from "swr"

import Layout from "@/components/layout/layout"
import { db } from "@/firebase/firebase.config"
import { FormDocument } from "@/types/form.types"

export default function Home() {
  const parent = useRef(null)
  const router = useRouter()

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const { data, isLoading } = useSWR(["forms"], async () => {
    const forms = collection(db, "forms")
    const q = query(forms, limit(20))

    const snap = await getDocs(q)
    return snap.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as FormDocument)
    )
  })

  return (
    <Layout title={"Forms by Barni"}>
      <div className="mb-6 mt-20 flex w-full max-w-[1024px] flex-col gap-y-4 px-4">
        {!isLoading && data
          ? data.map((form) => (
              <div
                onClick={() => router.push(`forms/${form.id}`)}
                key={form.id}
                className="cursor-pointer"
              >
                <p className="text-xl font-medium">{form.formObject.title}</p>
                <p className="text-xs text-pink-500">{form.id}</p>
              </div>
            ))
          : null}
      </div>
    </Layout>
  )
}
