import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../../app/page'

test('Navbar component is present', () => {
    render(<Home />)
    const navbar = screen.getByTestId('navbar')
    expect(navbar).toBeDefined()
  })
  
  test('Page contains the expected heading text', () => {
    const heading = screen.getByRole('heading', { level: 1, name: /Welcome to our E-Learning Platform/i })
    expect(heading).toBeDefined()
  })
  
  test('Page contains the expected paragraph text', () => {
    const paragraph = screen.getByText(/Join us and explore the world of knowledge./i)
    expect(paragraph).toBeDefined()
  })
  
  test('"Get Started" link is present', () => {
    const link = screen.getByText(/Get Started/i)
    expect(link).toBeDefined()
  })

test('"Get Started" link leads to the correct page', () => {
    const link = screen.getByText(/Get Started/i)
    expect(link).toBeDefined()
    expect(link.closest('a').getAttribute('href')).toBe('/login')
})