import { PDFViewer } from "@/node";
import { describe, expect, it } from "vitest";

describe('PDFViewer', () => {
    it('should throw', () => {
        expect(PDFViewer).toThrow('PDFViewer is not available in the browser')
    })
})