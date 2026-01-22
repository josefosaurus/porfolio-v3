import type { APIRoute } from 'astro'
import Badge from '@assets/images/badge.png'
import MiduBadge from '@assets/images/midu.svg'
import AntBadge from '@assets/images/anthropic_logo.jpg'

export const GET: APIRoute = () => {
  const certificatesData = [
    {
      image: MiduBadge.src,
      link: 'https://certificados.midudev.com/f9357753-608c-4210-9b15-4cf8db414ebd.pdf',
      title: 'Python desde cero',
      institution: 'Midudev',
      year: '2026',
      theme: 'midudev' as const,
    },
    {
      image: Badge.src,
      link: 'https://platzi.com/p/Josefosaurus/curso/4623-course/diploma/detalle/',
      title: 'Audiocurso de Frameworks y Arquitecturas Frontend: Casos de Estudio',
      institution: 'Platzi',
      year: '2023',
      theme: 'platzi' as const,
    },
    {
      image: AntBadge.src,
      link: 'https://verify.skilljar.com/c/c76yzitk2qon',
      title: 'Claude Code in Action',
      institution: 'Anthropic',
      year: '2025',
      theme: 'default' as const,
    },
  ]

  return new Response(JSON.stringify(certificatesData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
