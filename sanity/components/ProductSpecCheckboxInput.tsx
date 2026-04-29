'use client'

import { useCallback, useEffect, useState } from 'react'
import { set, unset, useClient, useFormValue } from 'sanity'
import type { ArrayOfPrimitivesInputProps } from 'sanity'
import { Stack, Card, Text, Flex, Spinner, Checkbox } from '@sanity/ui'

type ProductSpecField = 'format.items' | 'epaisseur' | 'finishes'

const SPEC_QUERY = `*[_id == $id || _id == "drafts." + $id]
  | order(_updatedAt desc) [0]
  .specificationSection`

function extractField(spec: any, field: ProductSpecField): unknown {
  switch (field) {
    case 'format.items':
      return spec?.format?.items
    case 'epaisseur':
      return spec?.epaisseur
    case 'finishes':
      return spec?.finishes
  }
}

function normalizeToArray(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.filter((v): v is string => typeof v === 'string')
  }
  if (typeof raw === 'string' && raw.trim()) {
    return raw.split(/\s*[-–,]\s*/).filter(Boolean)
  }
  return []
}

/**
 * Custom Sanity input that reads the sibling `product` reference,
 * fetches that product's specificationSection, and renders checkboxes
 * so editors can pick a subset of the product's values.
 *
 * Configure via schemaType.options.productSpecField:
 *   'format.items' | 'epaisseur' | 'finishes'
 */
export function ProductSpecCheckboxInput(props: ArrayOfPrimitivesInputProps) {
  const { onChange, value, path, schemaType } = props

  const currentValue = (value as string[] | undefined) ?? []
  const specField = (schemaType.options as any)?.productSpecField as ProductSpecField | undefined

  const productRef = useFormValue([...path.slice(0, -1), 'product']) as
    | { _ref?: string }
    | undefined
  const productId = productRef?._ref

  const client = useClient({ apiVersion: '2024-01-01' })
  const [options, setOptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!productId || !specField) {
      setOptions([])
      return
    }

    setLoading(true)
    client
      .fetch(SPEC_QUERY, { id: productId })
      .then((spec: any) => setOptions(normalizeToArray(extractField(spec, specField))))
      .catch(() => setOptions([]))
      .finally(() => setLoading(false))
  }, [productId, specField, client])

  const handleToggle = useCallback(
    (item: string) => {
      const next = currentValue.includes(item)
        ? currentValue.filter((v) => v !== item)
        : [...currentValue, item]
      onChange(next.length > 0 ? set(next) : unset())
    },
    [currentValue, onChange],
  )

  if (!productId) {
    return (
      <Card padding={3} tone="caution" border radius={2}>
        <Text size={1} muted>
          Sélectionnez d'abord un produit pour voir les options disponibles.
        </Text>
      </Card>
    )
  }

  if (loading) {
    return (
      <Flex align="center" gap={2} padding={3}>
        <Spinner muted />
        <Text size={1} muted>Chargement des options du produit…</Text>
      </Flex>
    )
  }

  if (options.length === 0) {
    return (
      <Card padding={3} tone="caution" border radius={2}>
        <Text size={1} muted>
          Aucune option définie pour ce produit.
        </Text>
      </Card>
    )
  }

  return (
    <Stack space={2}>
      {options.map((option) => {
        const checked = currentValue.includes(option)
        return (
          <Card
            key={option}
            padding={2}
            radius={2}
            tone={checked ? 'primary' : 'default'}
            style={{ cursor: 'pointer' }}
            as="label"
          >
            <Flex align="center" gap={3}>
              <Checkbox checked={checked} onChange={() => handleToggle(option)} />
              <Text size={1} weight={checked ? 'medium' : 'regular'}>
                {option}
              </Text>
            </Flex>
          </Card>
        )
      })}
    </Stack>
  )
}
