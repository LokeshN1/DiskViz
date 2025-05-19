export class File {
  constructor(name, size, clusters) {
    this.name = name;
    this.size = size;
    this.clusters = clusters;
    this.isFragmented = this.checkFragmentation();
  }

  checkFragmentation() {
    for (let i = 1; i < this.clusters.length; i++) {
      if (this.clusters[i] !== this.clusters[i - 1] + 1) {
        return true;
      }
    }
    return false;
  }
}

export class FileSystem {
  constructor(diskSize = 199) {
    this.diskSize = diskSize;
    this.files = new Map();
    this.clusterMap = new Array(diskSize + 1).fill(null);
  }

  addFile(file) {
    this.files.set(file.name, file);
    file.clusters.forEach(cluster => {
      this.clusterMap[cluster] = file.name;
    });
  }

  getFragmentationPercentage() {
    const fragmentedFiles = Array.from(this.files.values()).filter(f => f.isFragmented);
    return (fragmentedFiles.length / this.files.size) * 100;
  }

  getClusterAccesses(fileName) {
    const file = this.files.get(fileName);
    return file ? file.clusters : [];
  }
}