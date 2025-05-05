import { PrismaClient } from '@prisma/client';

// Create a singleton Prisma instance
const prisma = new PrismaClient();

// Add middleware for Model creation only
prisma.$use(async (params, next) => {
  // Check if it's a create operation on the Model model
  if (params.model === 'Model' && params.action === 'create') {
    // Execute the original query first
    const result = await next(params);
    
    // Only perform the update if this is a data operation, not a schema operation
    if (result && result.id) {
      try {
        // Update the model with modelId equal to id
        await prisma.model.update({
          where: { id: result.id },
          data: { modelId: result.id },
        });
        
        // Get and return the updated model
        return await prisma.model.findUnique({
          where: { id: result.id },
        });
      } catch (error) {
        console.error('Error in Prisma middleware:', error);
        return result; // Return original result if update fails
      }
    }
    
    return result;
  }
  
  return next(params);
});

export default prisma;
