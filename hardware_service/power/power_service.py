import subprocess
import logging

logger = logging.getLogger('app.power.power_service')

class PowerService:
    def __init__(self, mock = False):
        self.mock = mock
    
    def _run_cmd(self, cmd: str):
        if self.mock:
            cmd_str = f'"MOCK - {cmd}"'
            process = subprocess.Popen(['echo', cmd_str], stdout=subprocess.PIPE)
        else:
            process = subprocess.Popen(cmd.split(), stdout=subprocess.PIPE)
        
        return process.communicate()

    def shutdown(self):
        cmd_str = 'sudo shutdown -h now'
        logger.info(f'Running shutdown command - {cmd_str}')
        return self._run_cmd(cmd_str)
