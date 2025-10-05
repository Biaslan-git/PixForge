'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ToolSettingsProps {
  selectedTool: string;
}

const ToolSettings = ({ selectedTool }: ToolSettingsProps) => {
  // Convert tool ID to proper display name
  const getToolDisplayName = (toolId: string) => {
    switch(toolId) {
      case 'convert': return 'Конвертация';
      case 'compress': return 'Сжатие';
      case 'crop': return 'Обрезка';
      case 'watermark': return 'Водяной знак';
      default: return toolId;
    }
  };

  // Animation variants for smooth transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Render different settings based on selected tool
  const renderToolSettings = () => {
    switch(selectedTool) {
      case 'convert':
        return (
          <motion.div 
            key="convert" 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium mb-1">Формат изображения</label>
              <select 
                name="format"
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
                <option value="gif">GIF</option>
              </select>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium mb-1">Качество (для JPG и WebP)</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="range" 
                  name="quality"
                  min="1"
                  max="100"
                  defaultValue="80"
                  className="w-full"
                />
                <span className="text-sm w-10">80%</span>
              </div>
            </motion.div>
          </motion.div>
        );
      
      case 'compress':
        return (
          <motion.div 
            key="compress" 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium mb-1">Уровень сжатия</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="range" 
                  name="compression"
                  min="1"
                  max="100"
                  defaultValue="60"
                  className="w-full"
                />
                <span className="text-sm w-10">60%</span>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium mb-1">Целевой размер файла (KB)</label>
              <input 
                type="number" 
                name="targetSize" 
                placeholder="Введите размер" 
                min="1"
                className="w-full p-2 border rounded-md bg-background"
              />
            </motion.div>
          </motion.div>
        );
      
      case 'crop':
        return (
          <motion.div 
            key="crop" 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ширина (px)</label>
                <input 
                  type="number" 
                  name="width" 
                  placeholder="Ширина" 
                  min="1"
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Высота (px)</label>
                <input 
                  type="number" 
                  name="height" 
                  placeholder="Высота" 
                  min="1"
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">X (отступ слева)</label>
                <input 
                  type="number" 
                  name="x" 
                  placeholder="X координата" 
                  min="0"
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Y (отступ сверху)</label>
                <input 
                  type="number" 
                  name="y" 
                  placeholder="Y координата" 
                  min="0"
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium mb-1">Сохранить пропорции</label>
              <div className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  name="keepAspectRatio" 
                  className="mr-2 h-4 w-4"
                />
                <span>Включить</span>
              </div>
            </motion.div>
          </motion.div>
        );
      
      case 'watermark':
        return (
          <motion.div 
            key="watermark" 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium mb-1">Загрузить изображение водяного знака</label>
              <input 
                type="file" 
                name="watermarkImage" 
                accept="image/*"
                className="w-full p-2 border rounded-md bg-background"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Позиция по X (%)</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="range" 
                    name="positionX"
                    min="0"
                    max="100"
                    defaultValue="10"
                    className="w-full"
                  />
                  <span className="text-sm w-10">10%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Позиция по Y (%)</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="range" 
                    name="positionY"
                    min="0"
                    max="100"
                    defaultValue="90"
                    className="w-full"
                  />
                  <span className="text-sm w-10">90%</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium mb-1">Прозрачность (%)</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="range" 
                  name="opacity"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="w-full"
                />
                <span className="text-sm w-10">50%</span>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium mb-1">Размер водяного знака (%)</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="range" 
                  name="size"
                  min="10"
                  max="100"
                  defaultValue="20"
                  className="w-full"
                />
                <span className="text-sm w-10">20%</span>
              </div>
            </motion.div>
          </motion.div>
        );
      
      default:
        return (
          <motion.div 
            key="default" 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit"
          >
            <p>Настройки для выбранного инструмента недоступны</p>
          </motion.div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getToolDisplayName(selectedTool)}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderToolSettings()}
      </CardContent>
    </Card>
  );
};

export default ToolSettings;