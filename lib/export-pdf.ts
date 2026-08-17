import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'

/**
 * Waits for web fonts to finish loading and for the browser to paint at least
 * one frame so the target element is fully rendered before we capture it.
 */
async function waitForRender() {
  if (typeof document !== 'undefined' && 'fonts' in document) {
    try {
      await (document as Document & { fonts: FontFaceSet }).fonts.ready
    } catch {
      // Ignore font loading errors and continue.
    }
  }
  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  )
}

/**
 * Renders a DOM element to a paginated A4 PDF and triggers a download.
 * Uses html2canvas-pro (supports oklch colors) + jsPDF for a reliable,
 * fully client-side export of exactly what is shown on screen.
 */
export async function exportElementToPdf(element: HTMLElement, fileName: string) {
  await waitForRender()

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  })

  const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  // Scale the captured image to the full PDF page width.
  const imgWidth = pageWidth
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  const imgData = canvas.toDataURL('image/png')

  let heightLeft = imgHeight
  let position = 0

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight

  // Add additional pages for content taller than one A4 page.
  while (heightLeft > 0) {
    position -= pageHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  pdf.save(fileName)
}
