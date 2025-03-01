// Types for the share data
interface ShareData {
    recipientName: string
    senderName: string
    message: string
    theme: string
  }
  
  /**
   * Encodes the greeting card data for sharing via URL
   */
  export function encodeShareData(data: ShareData): string {
    // Convert the data object to a JSON string
    const jsonString = JSON.stringify(data)
  
    // Encode the JSON string to base64 to make it URL-safe
    // Note: In a production app, you might want to use a more secure encoding method
    return btoa(jsonString)
  }
  
  /**
   * Decodes the shared data from the URL
   */
  export function decodeShareData(encodedData: string | null): ShareData {
    // Default values if no data is provided
    const defaultData: ShareData = {
      recipientName: "",
      senderName: "",
      message:
        "May the spirit of Ramadan illuminate your heart and mind and may Allah bless you with health, prosperity and happiness.",
      theme: "blue-gold",
    }
  
    if (!encodedData) {
      return defaultData
    }
  
    try {
      // Decode the base64 string back to a JSON string
      const jsonString = atob(encodedData)
  
      // Parse the JSON string back to an object
      const data = JSON.parse(jsonString) as ShareData
  
      return {
        recipientName: data.recipientName || defaultData.recipientName,
        senderName: data.senderName || defaultData.senderName,
        message: data.message || defaultData.message,
        theme: data.theme || defaultData.theme,
      }
    } catch (error) {
      console.error("Error decoding share data:", error)
      return defaultData
    }
  }
  
  